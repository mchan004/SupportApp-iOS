//
//  SocketIOManager.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/8/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//
import UIKit
import SocketIO
import KeychainSwift

class SocketIOManager: NSObject {
    static let sharedInstance = SocketIOManager()
    var socket = SocketIOClient(socketURL: URL(string: MoreFunc().myWebsite)!)
    var usersList: [UserList] = []
    
    
    func pushToLogin() {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        appDelegate.switchLogin()
    }
    
    
    func establishConnection() {
        let keychain = KeychainSwift()
        if let token = keychain.get("token") {
            socket = SocketIOClient(socketURL: URL(string: MoreFunc().myWebsite)!, config: SocketIOClientConfiguration(arrayLiteral: SocketIOClientOption.connectParams(["token": token])))
            
            socket.connect()
            socket.on("connect", callback: { (data, ack) in
                self.socket.emit("authenticate", token)
            })
            socket.on("authenticated", callback: { (data, ack) in
                print("authenticated")
            })
            socket.on("unauthorized", callback: { (data, ack) in
                print("unauthorized")
                RoomMessageTableViewController().pushToLogin()
            })
        }
    }
    
    
    func closeConnection() {
        socket.disconnect()
    }
    
    
    func sendchat(idTo: String, message: String) {
        let dic: [String: String] = ["idTo": idTo, "message": message]
        self.socket.emit("FromSupporterSendMessage", dic)
    }
    
    
    
    func getUserList(completionHandler: @escaping (_ userList: [UserList]) -> Void) {
        socket.on("userList") { ( dataArray, ack) -> Void in
            let dataun = dataArray.first as! [[String: AnyObject]]
            var users: [UserList] = []
            for data in dataun {
                let u = UserList(id: data["id"] as! String, name: data["name"] as? String, date: data["created_at"] as! String, mess: data["message"] as? String)
                users.append(u)
            }
            self.usersList = users
            completionHandler(users)
        }
        receiveChatMessage()
    }
    
    func listenNewCustomer(completionHandler: @escaping (_ userList: UserList) -> Void) {
        socket.on("NewCustomer") { ( dataArray, ack) -> Void in
            let data = dataArray.first as! [String: AnyObject]
            let u = UserList(id: data["idFrom"] as! String, name: data["name"] as? String, date: data["date"] as! String, mess: "Someone want ask you!")
            completionHandler(u)
        }
    }
    
    fileprivate func receiveChatMessage() {
        socket.on("FromCustomerSendMessage") { ( data, ack) -> Void in
            let json = data.first as! [String: Any]
            let m: Message = Message(idFrom: json["idFrom"] as? String, idTo: json["idTo"]! as! String, message: json["message"]! as! String, attack: nil, created_at: json["date"] as? String)
            
            NotificationCenter.default.post(name: Notification.Name.init(rawValue: "ReceiveMessage"), object: m)
        }
    }
}

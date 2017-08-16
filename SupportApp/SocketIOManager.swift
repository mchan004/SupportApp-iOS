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
    static var idUser: String?
    
//    let socket = SocketIOClient(socketURL: URL(string: AllConfig().myWebsite)!)
    
    override init() {
        super.init()
    }
    
    
    var socket = SocketIOClient(socketURL: URL(string: AllConfig().myWebsite)!)
    
    func establishConnection() {
        
        let keychain = KeychainSwift()
        if let token = keychain.get("token") {
            socket = SocketIOClient(socketURL: URL(string: AllConfig().myWebsite)!, config: SocketIOClientConfiguration(arrayLiteral: SocketIOClientOption.connectParams(["token": token])))
            
            socket.connect()
            
            socket.on("error") { ( error, ack) -> Void in
                let alert = UIAlertController(title: "User's token has expired!", message: nil, preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "Let me login again", style: UIAlertActionStyle.default, handler: nil))
                
                let appDelegate = UIApplication.shared.delegate as! AppDelegate
                appDelegate.switchHome()
            }
            
            
            
//            socket.on("unauthorized", function(error, callback) {
//                if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
//                    // redirect user to login page perhaps or execute callback:
//                    callback();
//                    console.log("User's token has expired");
//                }
//            });
            
            
            
            
        }
        
    }
    
    
    func closeConnection() {
        
        
        socket.disconnect()
        
        
    }
    
    func getUserList(userName: String, completionHandler: @escaping (_ userList: [UserList]) -> Void) {
        socket.on("userList") { ( dataArray, ack) -> Void in
            let dataun = dataArray[0] as! [[String: AnyObject]]
            var usersList: [UserList] = []
            for data in dataun {
                
                let u = UserList(id: data["id"] as! String, name: data["name"] as? String, date: data[""] as? String)
                usersList.append(u)
            }
            completionHandler(usersList)
        }
    }
    
    
    func getChatLog(idCustomer: String, completionHandler: @escaping () -> Void) {
        socket.on("userList") { ( dataArray, ack) -> Void in
            
        }
    }
    
    
    func connectToServerWithNickname(nickname: String, completionHandler: @escaping (_ userList: [[String: AnyObject]]?) -> Void) {
        socket.emit("connectUser", nickname)
        
        socket.on("userList") { ( dataArray, ack) -> Void in
            completionHandler(dataArray[0] as? [[String: AnyObject]])
        }
        
        listenForOtherMessages()
    }
    
    
    func exitChatWithNickname(nickname: String, completionHandler: () -> Void) {
        socket.emit("exitUser", nickname)
        completionHandler()
    }
    
    
    func sendMessage(message: String, withNickname nickname: String) {
        socket.emit("chatMessage", nickname, message)
    }
    
    
    func getChatMessage(completionHandler: @escaping (_ messageInfo: [String: String]) -> Void) {
        socket.on("newChatMessage") { (dataArray, socketAck) -> Void in
            var messageDictionary = [String: String]()
            messageDictionary["nickname"] = dataArray[0] as? String
            messageDictionary["message"] = dataArray[1] as? String
            messageDictionary["date"] = dataArray[2] as? String
            
            completionHandler(messageDictionary)
        }
    }
    
    
    private func listenForOtherMessages() {
        socket.on("userConnectUpdate") { (dataArray, socketAck) -> Void in
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "userWasConnectedNotification"), object: dataArray[0] as! [String: AnyObject])
        }
        
        socket.on("userExitUpdate") { (dataArray, socketAck) -> Void in
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "userWasDisconnectedNotification"), object: dataArray[0] as! String)
        }
        
        socket.on("userTypingUpdate") { (dataArray, socketAck) -> Void in
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "userTypingNotification"), object: dataArray[0] as? [String: AnyObject])
        }
    }
    
    
    func sendStartTypingMessage(nickname: String) {
        socket.emit("startType", nickname)
    }
    
    
    func sendStopTypingMessage(nickname: String) {
        socket.emit("stopType", nickname)
    }
}
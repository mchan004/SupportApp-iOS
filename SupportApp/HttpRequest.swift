//
//  HttpRequest.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/23/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit
import Alamofire
import KeychainSwift

class HttpRequest {
    
    let keychain = KeychainSwift()
    var token: String?
    
    init() {
        
        if let t = keychain.get("token") {
            token = t
        } else {
            pushToLogin()
        }
        
        
    }
    
    func pushToLogin() {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        appDelegate.switchLogin()
    }
    
    func checkError() {
        
    }
    
    func getChatlog(idCus: String, completionHandler: @escaping (_ messages: [Message]) -> Void) {
        
        let headers: HTTPHeaders = [
            "x-access-token": token!
        ]
        
        let parameters: Parameters = [
            "idCus": idCus
        ]
        
        Alamofire.request(MoreFunc().myWebsite + "/getChatlog", method: .post, parameters: parameters, headers: headers).response { response in
            if let data = response.data {
                
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: []) as! [[String: Any]]
                    
                    var messages: [Message] = []
                    
                    for j in json {
                        
                        let message = Message(idFrom: j["idFrom"] as? String, idTo: j["idTo"] as! String, message: j["message"] as! String, attack: j["attack"] as? String, created_at: j["created_at"] as? String)
                        messages.append(message)
                    }
                    
                    
                    completionHandler(messages)
                    
                } catch {
                    print("Error deserializing JSON: \(error)")
                }
                
                
            }
        }

    }
    
    
    
    func getUserList(completionHandler: @escaping (_ userList: [UserList]) -> Void) {
        
        let headers: HTTPHeaders = [
            "x-access-token": token!
        ]
        
        Alamofire.request(MoreFunc().myWebsite + "/getUserList", method: .post, headers: headers).response { response in
            if let data = response.data {
                
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: []) as! [[String: Any]]
                    
                    var userList: [UserList] = []
                    
                    for j in json {
                        
                        let user = UserList(id: j["id"] as! String, name: j["name"] as? String, date: j["created_at"] as! String, mess: j["message"] as? String)
                        
                        userList.append(user)
                    }
                    
                    
                    completionHandler(userList)
                    
                } catch {
                    print("Error deserializing JSON: \(error)")
                }
                
                
            }
        }
        
    }
    
}

//
//  RoomMessageTableViewController.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/1/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit
import KeychainSwift
import Reachability

class RoomMessageTableViewController: UITableViewController {
    
    @IBOutlet weak var SideMenu: UIBarButtonItem!
    let userDefaults = UserDefaults()
    var userList: [UserList] = []
    override func viewDidLoad() {
        super.viewDidLoad()
        MoreFunc().checkNetwork(fromController: self)
        setupView()
        setupTableView()
        
    }
    
    
    ////////////////
    ////Function////
    ////////////////
    func pushToLogin() {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        appDelegate.switchLogin()
    }
    func setupView() {
        let keychain = KeychainSwift()
        if keychain.get("token") == nil {
            pushToLogin()
        }
        
        if self.revealViewController() != nil {
            SideMenu.target = self.revealViewController()
            SideMenu.action = #selector(SWRevealViewController.revealToggle(_:))
            self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
        }
    }
    
    func reloadTableView() {
        DispatchQueue.main.async() {
            self.tableView.reloadData()
        }
    }
    
    func getUserList() {
        let httpRequest = HttpRequest()
        httpRequest.getUserList() { (data) in
            self.userList = data
            self.reloadTableView()
        }
    }
    
    @objc func sortTableView(_ notification: Notification) {
        let message = notification.object as! Message
        
//        let find = userList.index(where: { (i) -> Bool in
//            return i.id == message.idFrom
//        })
//
//        if find != nil {
            let index = userList.index { (i) -> Bool in
                return i.id == message.idFrom || i.id == message.idTo
            }
            if let i = index {
                userList[i].date = message.created_at!
                userList[i].mess = message.message
                userList.sort { $0.date > $1.date }
                reloadTableView()
            }
         else {
            getUserList()
        }
        
    }
    
    
    
    
    
    /////////////////
    ////Tableview////
    /////////////////
    
    func setupTableView() {
//        SocketIOManager.sharedInstance.getUserList { (data) in
//            self.userList = data
//            self.reloadTableView()
//        }
        getUserList()
        SocketIOManager.sharedInstance.listenNewCustomer { (data) in
            self.userList.insert(data, at: 0)
            self.reloadTableView()
        }
        NotificationCenter.default.addObserver(self, selector: #selector(sortTableView(_:)), name: Notification.Name.init(rawValue: "ReceiveMessage"), object: nil)
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return userList.count
    }
    
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! RoomMessageTableViewCell
        
        // Configure the cell...
        cell.user = userList[indexPath.row]
        return cell
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 67
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        userDefaults.set(userList[indexPath.row].id, forKey: "idCustommerSelected")
        userDefaults.set(userList[indexPath.row].name, forKey: "nameCustommerSelected")
    }
    
    
    
}

//
//  RoomMessageTableViewController.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/1/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit
import KeychainSwift

class RoomMessageTableViewController: UITableViewController {

    @IBOutlet weak var SideMenu: UIBarButtonItem!
    let userDefaults = UserDefaults()
    var userList: [UserList] = []
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let keychain = KeychainSwift()
        if keychain.get("token") == nil {
            let appDelegate = UIApplication.shared.delegate as! AppDelegate
            appDelegate.switchLogin()
        }
        
        if self.revealViewController() != nil {
            SideMenu.target = self.revealViewController()
            SideMenu.action = #selector(SWRevealViewController.revealToggle(_:))
            self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
        }
        
        SocketIOManager.sharedInstance.getUserList(userName: "sdf") { (data) in
            self.userList = data
            
            DispatchQueue.main.async() {
                self.tableView.reloadData()
            }
        }
        
    }
    
    
/////////////////
////Tableview////
/////////////////
    
    
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
    }
    
}


////////////////
////Function////
////////////////




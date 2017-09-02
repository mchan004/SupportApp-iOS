//
//  MessagesViewController.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/3/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit
import SocketIO



class MessagesViewController: UIViewController, UITableViewDataSource,UITableViewDelegate, UITextFieldDelegate, UINavigationControllerDelegate {

    
    @IBOutlet weak var tableViewSMS: UITableView!
    @IBOutlet weak var messageTextField: UITextField!
    @IBOutlet weak var textBottomLayout: NSLayoutConstraint!
    @IBOutlet weak var nameNavigation: UILabel!
    let userDefaults = UserDefaults()
    var idCus: String = ""
    var messages: [Message] = []
    
    @IBAction func sendButtonAction(_ sender: Any) {
        handleSend()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        idCus = userDefaults.object(forKey: "idCustommerSelected") as! String
        //Do any additional setup after loading the view.
        setupNavigationBar()
        setupTableView()
        setupKeyboard()
        
        getChatlog()
        
        
        
    }
    
    
    
    
//////////////////////
////Navigation Bar////
//////////////////////
    
    func setupNavigationBar() {
        
        //Back Button
        let backButton = UIButton.init(type: .custom)
        backButton.setImage(#imageLiteral(resourceName: "back").withRenderingMode(.alwaysTemplate), for: UIControlState.normal)
        backButton.frame = CGRect(x: 0, y: 0, width: 23, height: 23)
        backButton.tintColor = #colorLiteral(red: 1, green: 1, blue: 1, alpha: 1)
        backButton.addTarget(self, action: #selector(self.backButton), for: .touchUpInside)
        navigationItem.leftBarButtonItem = UIBarButtonItem(customView: backButton)
        
        let nameCustomer = userDefaults.object(forKey: "nameCustommerSelected") as! String
        nameNavigation.text = nameCustomer
    }
    
    
    func backButton() {
        _ = navigationController?.popViewController(animated: true)
    }
    
    
/////////////////
////TableView////
/////////////////
    func setupTableView() {
        tableViewSMS.rowHeight = UITableViewAutomaticDimension
        tableViewSMS.estimatedRowHeight = 20
        tableViewSMS.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: 12, right: 0)
        
        
        SocketIOManager.sharedInstance.receiveChatMessage { (data) in
            self.messages.append(data)
            self.tableViewReloadData()
        }
        
        
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return messages.count
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        if messages[indexPath.row].idTo == idCus {
            let cell = tableViewSMS.dequeueReusableCell(withIdentifier: "send", for: indexPath) as! SendMessageTableViewCell
            cell.message.text = messages[indexPath.row].message
            return cell
        }
        else {
            let cell = tableViewSMS.dequeueReusableCell(withIdentifier: "receive", for: indexPath) as! ReceiveMessageTableViewCell
            cell.message.text = messages[indexPath.row].message
            return cell
        }
        
        
        
    }

    
    
////////////////
////keyboard////
////////////////

    //Touch outside
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    
    
    //Touch enter
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        handleSend()
        return true
    }
    
    func setupKeyboard() {
        tableViewSMS.keyboardDismissMode = .onDrag
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillShow(_:)), name: Notification.Name.UIKeyboardWillShow, object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillHide(_:)), name: Notification.Name.UIKeyboardWillHide, object: nil)
        
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        
        NotificationCenter.default.removeObserver(self)
    }
    
    func keyboardWillShow(_ notification: Notification) {
        let keyboardHeight = (notification.userInfo?[UIKeyboardFrameEndUserInfoKey] as AnyObject).cgRectValue.height
        let keyboardDuration = (notification.userInfo?[UIKeyboardAnimationDurationUserInfoKey] as AnyObject).doubleValue
        
        textBottomLayout.constant = keyboardHeight
        
        UIView.animate(withDuration: keyboardDuration!, animations: {
            self.view.layoutIfNeeded()
        })
        
        
        tableViewReloadData()
    }
    
    
    
    func keyboardWillHide(_ notification: Notification) {
        
        let keyboardDuration = (notification.userInfo?[UIKeyboardAnimationDurationUserInfoKey] as AnyObject).doubleValue
        
        textBottomLayout.constant = 0
        
        UIView.animate(withDuration: keyboardDuration!, animations: {
            self.view.layoutIfNeeded()
        })
        
    }
    
    
    
////////////////
////Function////
////////////////
    func handleSend() {
//        view.endEditing(true)
        if messageTextField.text! == "" {
            return
        }
        SocketIOManager.sharedInstance.sendchat(idTo: idCus, message: messageTextField.text!)
        
        
        let M: Message = Message(idFrom: nil, idTo: idCus, message: messageTextField.text!, attack: nil, created_at: nil)
        messages.append(M)
        tableViewReloadData()
        
        messageTextField.text = nil
        
    }
    
    func tableViewReloadData() {
        DispatchQueue.main.async() {
            self.tableViewSMS.reloadData()
            let numberOfRows = self.tableViewSMS.numberOfRows(inSection: 0)
            if (numberOfRows > 0) {
                let index = IndexPath(row: numberOfRows - 1, section: 0)
                self.tableViewSMS.scrollToRow(at: index, at: .none, animated: false)
            }
            
        }
    }
    
    func getChatlog() {
        let httpRequest = HttpRequest()
        httpRequest.getChatlog(idCus: idCus) { (data) in
            self.messages = data
            self.tableViewReloadData()
        }
        
    }
    
    
    
    
    
}

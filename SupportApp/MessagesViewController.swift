//
//  MessagesViewController.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/3/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit

class MessagesViewController: UIViewController, UITableViewDataSource,UITableViewDelegate {

    
    @IBOutlet weak var tableViewSMS: UITableView!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        //Do any additional setup after loading the view.
        setupNavigationBar()
        
        tableViewSMS.rowHeight = UITableViewAutomaticDimension
        tableViewSMS.estimatedRowHeight = 20

        
    }
    
    
    
    func setupNavigationBar() {
        navigationController?.navigationBar.barTintColor = #colorLiteral(red: 0, green: 0.4784313725, blue: 1, alpha: 1)
        navigationController?.navigationBar.isTranslucent = false
        navigationController?.navigationBar.tintColor = #colorLiteral(red: 1, green: 1, blue: 1, alpha: 1)
        
        
        //Back Button
        let backButton = UIButton.init(type: .custom)
        backButton.setImage(#imageLiteral(resourceName: "back").withRenderingMode(.alwaysTemplate), for: UIControlState.normal)
        backButton.frame = CGRect(x: 0, y: 0, width: 23, height: 23)
        backButton.tintColor = #colorLiteral(red: 1, green: 1, blue: 1, alpha: 1)
        navigationItem.leftBarButtonItem = UIBarButtonItem(customView: backButton)
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 5
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableViewSMS.dequeueReusableCell(withIdentifier: "send", for: indexPath) as! SendMessageTableViewCell
//        let cell = Bundle.main.loadNibNamed("SendMessageTableViewCell", owner: self, options: nil)?.first as! SendMessageTableViewCell
//        cell.selectionStyle = .none
        
        
        
        
        return cell
        
    }
    
//    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
//        return
//    }
    
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    

}

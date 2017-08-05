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
        tableViewSMS.separatorStyle = .none
        
    }
    
    let messages = ["hello hello hello asdasd asd asd asd asdasd asd asd asdasd asdasd", "asd asd asdasd asda", "asda asd asd asd asdasd asdasd asda", "a", "asdas asd asda sda sd asd as das dd", "asd asd asd as da sd sada", "asd asd", "asd asd as da sd asd as da sd a sd as da sf sdf ad gsdf g sdf gsd fg sdf gsr eg rer gsd fg sdfg sdf g sdf gds fg sd fg fd gsd fg sdf g regremkejr ker fkd f sdf asdf ae ef ad  erg wr gtr wb sfd  sfd gs df vds v xc bsd fga  e fg gksfjd v kadj vkjd kfj fdfkjv skjfd gkjd fkaj dfkj sadjkf akj sdfasd jfkajd fka sdkjf askjd fkjasd fkas dfkjas fdkj askdjf akjd fmq kj eifjbiasd kajds fkajs fksajd fkaj fkjasd fkajsd fka dfkj a skdfaksdfk asdfjk askjfd kja fkjasf ks", "sdf sdfs df sdfsdfsdf"]
    
    
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
        return messages.count
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableViewSMS.dequeueReusableCell(withIdentifier: "send", for: indexPath) as! SendMessageTableViewCell
        
        cell.message.text = messages[indexPath.row]
        return cell
        
    }

    
    

}

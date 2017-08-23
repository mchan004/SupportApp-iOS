//
//  LoginController.swift
//  SupportApp
//
//  Created by Thanh Tu Le Xuan on 7/25/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit
import KeychainSwift

class LoginController: UIViewController {

    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var username: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var logoImage: UIImageView!
    let keychain = KeychainSwift()
    @IBAction func login(_ sender: Any) {
        if (username.text?.length)! < 3 || (password.text?.length)! < 3 {
            alert()
            return
        }
        let httpRQ = HttpRequest()
        httpRQ.login(username: username.text!, password: password.text!) { (data) in
            if let code: Int = data["code"] as? Int {
                if code == 1 {
                    if let mess: String = data["token"] as? String {
                        self.keychain.set(mess, forKey: "token")
                        if let name = data["name"] as? String {
                            self.keychain.set(name, forKey: "userName")
                        }
                        SocketIOManager.sharedInstance.establishConnection()
                        
                        let appDelegate = UIApplication.shared.delegate as! AppDelegate
                        appDelegate.switchHome()
                        
                    }
                } else {
                    self.alert()
                }
                
            }
        }
        
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        keychain.clear()
        SocketIOManager.sharedInstance.closeConnection()
        
        view.backgroundColor = #colorLiteral(red: 0.08352845162, green: 0.5444770455, blue: 0.8616511822, alpha: 1)
        
        loginButton.clipsToBounds = true
        loginButton.layer.cornerRadius = 7
        
        loginButton.layer.borderWidth = 1
        loginButton.layer.borderColor = UIColor.white.cgColor
        
        logoImage.image = #imageLiteral(resourceName: "logo_end").withRenderingMode(.alwaysTemplate)
        
    }

    func alert() {
        let alert = UIAlertController(title: "Something wrong here!", message: nil, preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Let me check again", style: UIAlertActionStyle.default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
}

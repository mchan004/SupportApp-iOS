//
//  LoginController.swift
//  SupportApp
//
//  Created by Thanh Tu Le Xuan on 7/25/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit
import Alamofire

class LoginController: UIViewController {

    @IBOutlet weak var username: UITextField!
    @IBOutlet weak var password: UITextField!
    
    @IBAction func login(_ sender: Any) {
        let parameters: Parameters = ["username": username.text!, "password": password.text!]
        Alamofire.request("http://192.168.1.107:3000/login", method: .post, parameters: parameters).responseJSON { response in
            
            
            
            if let data = response.data, let utf8Text = String(data: data, encoding: .utf8) {
                if utf8Text == "sai" {
                    let alert = UIAlertController(title: "Something wrong here!", message: nil, preferredStyle: UIAlertControllerStyle.alert)
                    alert.addAction(UIAlertAction(title: "Let me check again", style: UIAlertActionStyle.default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                    
                    
                } else {
                    print(utf8Text)
                }
                
            }
        }
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}


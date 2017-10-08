//
//  NewFunction.swift
//  SupportApp
//
//  Created by Thanh Tu on 10/6/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import Foundation
import ReachabilitySwift

class MoreFunc {
//    let myWebsite = "http://172.30.0.252:3000"
    let myWebsite = "http://192.168.1.110:3000"
    
    func showAlert(fromController controller: UIViewController, title:String?, message: String?) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Let me check again", style: UIAlertActionStyle.default, handler: nil))
        controller.present(alert, animated: true, completion: nil)
        
    }
    
    func checkNetwork(fromController controller: UIViewController) {
        
        let reachability = Reachability()!
        reachability.whenUnreachable = { _ in
            MoreFunc().showAlert(fromController: controller, title: "No network connection!", message: nil)
        }
        
        do {
            try reachability.startNotifier()
        } catch {
            print("Unable to start notifier")
        }
        
    }
}

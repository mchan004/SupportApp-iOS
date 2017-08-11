//
//  Extension.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/6/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import Foundation


extension UIApplication {
    var statusBarView: UIView? {
        return value(forKey: "statusBar") as? UIView
    }
}


class AllConfig {
    let myWebsite = "http://192.168.1.107:3000"
    
    
//    func AllConfig() -> String {
//        return myWebsite
//    }
}

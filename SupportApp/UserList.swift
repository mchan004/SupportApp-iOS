//
//  UserList.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/8/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

//import Foundation
struct UserList {
    var id: String
    var name: String?
    var date: String
    var mess: String?
    
//    init(id: String, name: String? = nil, date: String? = nil) {
//        self.id = id
//        self.name = name
//        self.date = date
//    }
}
struct Rectangle {
    var length: Double?
    
    init(frombreadth breadth: Double) {
        length = breadth * 10
    }
    
    init(frombre bre: Double) {
        length = bre * 30
    }
    
    init(_ area: Double) {
        length = area
    }
}

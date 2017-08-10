//
//  File.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/10/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//


struct Message {
    var id: String
    var idTo: String
    var message: String
    
    init(id: String, idTo: String, message: String) {
        self.id = id
        self.idTo = idTo
        self.message = message
    }
}

//
//  SendMessageTableViewCell.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/4/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit

class SendMessageTableViewCell: UITableViewCell {

    
    @IBOutlet weak var message: UILabel!
    
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
//        avataImage.clipsToBounds = true
//        avataImage.layer.cornerRadius = avataImage.frame.size.width / 2
//        avataImage.layer.borderWidth = 1
//        avataImage.layer.borderColor = UIColor.white.cgColor
//        
//        
//        widthLayout.constant = frame.width * 2 / 3
//        
//        
//        
//        box.clipsToBounds = true
//        box.layer.cornerRadius = 8
        message.text = "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello "
        
    }

    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
    
}

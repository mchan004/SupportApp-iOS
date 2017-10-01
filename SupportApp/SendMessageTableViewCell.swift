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
    
    @IBOutlet weak var avataImage: UIImageView!
    
    @IBOutlet weak var boxView: UIView!
    
    @IBOutlet weak var widthConstraint: NSLayoutConstraint!
    
    var mess: Message? {
        didSet {
            if let m = mess?.message {
                message.text = m
            }
        }
    }
    
    var aB: Bool? {
        didSet {
            avataImage.isHidden = aB!
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        selectionStyle = .none
        
        avataImage.clipsToBounds = true
        avataImage.layer.cornerRadius = avataImage.frame.size.width / 2
        avataImage.layer.borderWidth = 1
        avataImage.layer.borderColor = UIColor.white.cgColor
        
        widthConstraint.constant = (frame.width * (2 / 3)) - 50

        boxView.clipsToBounds = true
        boxView.layer.cornerRadius = 8
        
        
    }

    
//    override func setSelected(_ selected: Bool, animated: Bool) {
//        super.setSelected(selected, animated: animated)
//        
//        // Configure the view for the selected state
//    }
    
    
}

//
//  RoomMessageTableViewCell.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/1/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit

class RoomMessageTableViewCell: UITableViewCell {
    
    @IBOutlet weak var nameImage: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var messageLabel: UILabel!
    
    var user: UserList? {
        didSet {
            if let n = user?.name {
                nameLabel.text = n
                nameImage.text = n.substring(to: 2).uppercased()
            }
            if let m = user?.mess {
                messageLabel.text = m
            }
            
        }
    }
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        nameImage.clipsToBounds = true
        nameImage.layer.cornerRadius = nameImage.frame.size.width / 2
        

    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}

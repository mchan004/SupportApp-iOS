//
//  GroupSMSTableViewCell.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/1/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit

class GroupSMSTableViewCell: UITableViewCell {

    @IBOutlet weak var avataImage: UIImageView!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        
        
        avataImage.clipsToBounds = true
        avataImage.layer.cornerRadius = avataImage.frame.size.width / 2
        avataImage.layer.borderWidth = 1
        avataImage.layer.borderColor = UIColor.white.cgColor

    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}

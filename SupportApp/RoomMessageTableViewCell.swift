//
//  RoomMessageTableViewCell.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/1/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit

extension String {
    
    var length: Int {
        return self.characters.count
    }
    
    subscript (i: Int) -> String {
        return self[Range(i ..< i + 1)]
    }
    
    func substring(from: Int) -> String {
        return self[Range(min(from, length) ..< length)]
    }
    
    func substring(to: Int) -> String {
        return self[Range(0 ..< max(0, to))]
    }
    
    subscript (r: Range<Int>) -> String {
        let range = Range(uncheckedBounds: (lower: max(0, min(length, r.lowerBound)),
                                            upper: min(length, max(0, r.upperBound))))
        let start = index(startIndex, offsetBy: range.lowerBound)
        let end = index(start, offsetBy: range.upperBound - range.lowerBound)
        return self[Range(start ..< end)]
    }
    
}

class RoomMessageTableViewCell: UITableViewCell {
    
    @IBOutlet weak var nameImage: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    var user: UserList? {
        didSet {
            if let n = user?.name {
                nameLabel.text = n
                nameImage.text = n.substring(to: 2).uppercased()
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

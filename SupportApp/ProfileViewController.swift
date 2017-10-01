//
//  ProfileViewController.swift
//  SupportApp
//
//  Created by Thanh Tu on 8/2/17.
//  Copyright © 2017 Thanh Tu Le Xuan. All rights reserved.
//

import UIKit

class ProfileViewController: UIViewController, UIPickerViewDelegate, UIPickerViewDataSource, UITextFieldDelegate {

    @IBOutlet weak var posionPickerView: UIPickerView!
    @IBOutlet weak var posionTextField: UITextField!
    

    @IBOutlet weak var saveButton: UIButton!
    
    @IBOutlet weak var editAvataButton: UIButton!
    
    @IBOutlet weak var saveLayoutTop: NSLayoutConstraint!
    
    @IBAction func BackButton(_ sender: Any) {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        appDelegate.switchHome()
    }
    
    
    @IBAction func SaveButton(_ sender: Any) {
        
    }
    
    @IBAction func selectedPosionTextField(_ senqder: Any) {
        posionPickerView.isHidden = false
        self.saveLayoutTop.constant = 110
        UIView.animate(withDuration: 0.1) {
            self.view.layoutIfNeeded()
        }
    }
    let dataPickerView = ["Kỹ thuật", "Bán Hàng", "Tư vấn", "Kinh doanh"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        saveButton.layer.cornerRadius = 5
        editAvataButton.layer.cornerRadius = 7
        
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return dataPickerView[row]
    }
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        posionTextField.text = dataPickerView[row]
        posionPickerView.isHidden = true
        self.saveLayoutTop.constant = 30
        UIView.animate(withDuration: 0.1) {
            self.view.layoutIfNeeded()
        }
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return dataPickerView.count
    }
    
    

    
    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        return false
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}

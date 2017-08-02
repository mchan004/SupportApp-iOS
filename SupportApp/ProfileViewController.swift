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
    @IBAction func selectedPosionTextField(_ senqder: Any) {
        posionPickerView.isHidden = false
    }

    let dataPickerView = ["Kỹ thuật", "Bán Hàng", "Tư vấn", "Kinh doanh"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
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

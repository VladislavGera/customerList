export interface CustomerState {
  id: Number;
  name: String;
  email: String;
  customerTID: String;
  contactName: String;
  contactTelephone: String;
  notes?: String;
  softwareIds?: Number[];
  softwares?: any[];
}
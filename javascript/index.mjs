//import Web3 from "web3";
//import { fetchJson } from 'ethers/lib/utils';
// Kontrat Adresi
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const jsondata = fetchJson("../artifacts/contracts/CargoTrackingDapp.sol/CargoTrackingDapp.json");
console.log(jsondata);

// Web3.js ile sağlayıcı oluşturma
const web3Provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-2-s1.binance.org:8545');
const web3 = new Web3(web3Provider);

// Ethers.js ile sağlayıcı oluşturma
const provider = new ethers.providers.JsonRpcProvider('https://bscscan.com/address/0x5FbDB2315678afecb367f032d93F642f64180aa3');

// Web3.js ile kontrat oluşturma
const contract = new web3.eth.Contract(jsonData, contractAddress);

function handleSubmit(event){
  event.preventDefault(); // Form gönderme işlemini durdur
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const inputValue = document.getElementById('trackingnumber').value;
  const sender_address = "0x1234567890123456789012345678901234567890";
  const customer_address = "0x1234567890123456789012345678901234567845";
  const shippingStatus = "Accepted";
  const TransportationLine = "Road Transport";
  const shipping_date = 1634323200 ;
    const shippingDate = new Date(shipping_date * 1000);
  const delivery_date = 1635001200 ;
    const deliveryDate = new Date(delivery_date * 1000);
          alertPlaceholder.innerHTML =`
                      <!-- data table -->
                      <table style="width:100%">
                        <tr>
                          <th>Tracking Number</th>
                          <td>${inputValue}</td>
                        </tr>
                        <tr>
                          <th>Sender Address</th>
                          <td>${sender_address}</td>
                        </tr>
                        <tr>
                          <th>Customer Address</th>
                          <td>${customer_address}</td>
                        </tr>
                        <tr>
                          <th>Shipping Status</th>
                          <td>${shippingStatus}</td>
                        </tr>
                        <tr>
                          <th>Transportation Line</th>
                          <td>${TransportationLine}</td>
                        </tr>
                        <tr>
                          <th>Shipping Date</th>
                          <td>${shippingDate}</td>
                        </tr>
                        <tr>
                          <th>Delivery Date</th>
                          <td>${deliveryDate}</td>
                        </tr>`
            
}
// Kullanıcının girdiği değeri alınması ve ContractABI eşleşmesi kontrolünü yapmak
function eventHandler() {
    e.preventDefault(); //sayfanın yenilenmesini önlüyor
    const inputValue = document.getElementById('trackingnumber').value;
    
    // Burada doğru değerleri almanız gerekmektedir
    // const senderAddress = 'sender_address';
    // const customerAddress = 'customer_address';
    // const shippingStatus = '_Status';
    // const transportationLine = 'Line';
    // const shippingDate = 'shipping_date';
    // const deliveryDate = 'delivery_date';

     contract.methods.callCreateFunction(inputValue).call()
       .then((result) =>{
         const cargoTrackingNumber = result[0].toString();

          // Eşleşmeyi kontrol et ve tabloyu göster
      if (inputValue === cargoTrackingNumber.toString()) {
         showTable(cargoTrackingNumber, senderAddress, customerAddress, shippingStatus, transportationLine, shippingDate, deliveryDate);
        console.log("Onay: Eşleşme bulundu.")
      } else {
        // Hata durumunda kullanıcıya geri bildirim ver
          console.log('Hata: Cargo tracking number bulunamadı');
          const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
          alertPlaceholder.innerHTML = 
            `<div class="alert alert-${'error'} alert-dismissible" role="alert">`,
            `   <div>${'Tracking Number does not exist!'}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'   
      } 
      function showTable(cargoTrackingNumber, senderAddress, customerAddress, shippingStatus, transportationLine, shippingDate, deliveryDate) {
          const cargolist = document.querySelector("#cargolist");
          cargolist.innerHTML = `
            <!-- data table -->
            <table style="width:100%">
              <tr>
                <th>Tracking Number</th>
                <td>${cargoTrackingNumber}</td>
              </tr>
              <tr>
                <th>Sender Address</th>
                <td>${senderAddress}</td>
              </tr>
              <tr>
                <th>Customer Address</th>
                <td>${customerAddress}</td>
              </tr>
              <tr>
                <th>Shipping Status</th>
                <td>${shippingStatus}</td>
              </tr>
              <tr>
                <th>Transportation Line</th>
                <td>${transportationLine}</td>
              </tr>
              <tr>
                <th>Shipping Date</th>
                <td>${shippingDate}</td>
              </tr>
              <tr>
                <th>Delivery Date</th>
                <td>${deliveryDate}</td>
              </tr>
            </table>
            <!-- end of data table -->
          `
      }
const search = document.querySelector("#search");
search.addEventListener("click", eventHandler)  
})}
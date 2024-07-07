import {View, Text, Button} from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

export default function Payment() {
  const handlePay = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_AvKSnuBZr3kn5y',
      amount: '100',
      name: 'Acme Corp',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: 'black'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <View>
      <Button title="PAY NOW" onPress={handlePay}></Button>
    </View>
  );
}
// fXB7gghWdO5Fv9DpeCMuUdHA

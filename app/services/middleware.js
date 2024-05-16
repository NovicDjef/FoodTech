// middleware.js
import { setSomeAuthentification, fetchSomeRestaurant } from './Api';
import { sendPhoneNumber, verifyOTP } from '../redux/action/authActions';

import axios from 'axios';

export const sendPhoneNumberRequest = (phone) => {
  return async (dispatch) => {
    try {

      const authURL = setSomeAuthentification(phone);
      // Faire l'appel API pour envoyer le numéro de téléphone
      const response = await axios.post(authURL, {
        numero_telephone,
      });

      // Récupérer le code OTP de la réponse
      const otpCode = response.data.otpCode;

      // Dispatch l'action pour mettre à jour le store avec le numéro de téléphone
      dispatch(sendPhoneNumber(phone));

      // Dispatch l'action pour mettre à jour le store avec le code OTP
      dispatch(verifyOTP(phone, otpCode));
    } catch (error) {
      console.error('Erreur lors de l\'envoi du numéro de téléphone', error);
    }
  };
};


// [
// 	{
// 		"id": 1,
// 		"nom_restaurant": "Glacier moderne",
// 		"ville": "DOUALA",
// 		"phone_restaurant": "690089999",
// 		"menssion": "NOM_FAVORITE",
// 		"Adresse_restaurant": "Akwa & Sadi",
// 		"image_restaurant": "bde201f4-8877-4a82-a4d7-3b5ba885bdaa.jpg",
// 		"createdAt": "2024-04-07T23:20:31.135Z",
// 		"updateAt": "2024-04-07T23:20:31.135Z",
// 		"adminId": null,
// 		"Plats": [
// 			{
// 				"id": 1,
// 				"nom_plat": "Hamberger",
// 				"image_plat": "d3647ce8-1781-4d0e-8542-d20ebe31275f.jpg",
// 				"description_plat": "jnn endejdned dnekjdne dnekdne kenkdlne,k",
// 				"prix_plat": 1500,
// 				"quantity": 1,
// 				"menssionPLat": "FAVORITE",
// 				"createdAt": "2024-04-07T23:31:11.677Z",
// 				"updateAt": "2024-04-07T23:36:04.983Z",
// 				"favoritePlatsId": null,
// 				"restaurantId": 1,
// 				"categorieId": null
// 			}
// 		],
// 		"Article": [],
// 		"Reservation": [],
// 		"Admin": null
// 	},
// 	{
// 		"id": 2,
// 		"nom_restaurant": "Restaurant URL",
// 		"ville": "DOUALA",
// 		"phone_restaurant": "690089991",
// 		"menssion": "NOM_FAVORITE",
// 		"Adresse_restaurant": "Bonapriso",
// 		"image_restaurant": "c6a1ed0a-b945-47c4-986f-476963457043.jpg",
// 		"createdAt": "2024-04-07T23:28:04.177Z",
// 		"updateAt": "2024-04-07T23:28:04.177Z",
// 		"adminId": null,
// 		"Plats": [],
// 		"Article": [],
// 		"Reservation": [],
// 		"Admin": null
// 	},
// 	{
// 		"id": 3,
// 		"nom_restaurant": "loic Food",
// 		"ville": "DOUALA",
// 		"phone_restaurant": "690089991",
// 		"menssion": "NOM_FAVORITE",
// 		"Adresse_restaurant": "Bonamousadi",
// 		"image_restaurant": "eb20c711-aaa8-427e-bd8b-ec2dea954196.jpg",
// 		"createdAt": "2024-04-07T23:28:52.161Z",
// 		"updateAt": "2024-04-07T23:28:52.161Z",
// 		"adminId": null,
// 		"Plats": [],
// 		"Article": [],
// 		"Reservation": [],
// 		"Admin": null
// 	},
// 	{
// 		"id": 4,
// 		"nom_restaurant": "Frend Food",
// 		"ville": "DOUALA",
// 		"phone_restaurant": "690089990",
// 		"menssion": "NOM_FAVORITE",
// 		"Adresse_restaurant": "Bonamousadi",
// 		"image_restaurant": "a1cda11d-2699-4526-aa3b-b15c5bce5984.jpg",
// 		"createdAt": "2024-04-07T23:29:18.224Z",
// 		"updateAt": "2024-04-07T23:29:18.224Z",
// 		"adminId": null,
// 		"Plats": [],
// 		"Article": [],
// 		"Reservation": [],
// 		"Admin": null
// 	},
// 	{
// 		"id": 5,
// 		"nom_restaurant": "TchopEtYamo",
// 		"ville": "DOUALA",
// 		"phone_restaurant": "690089990",
// 		"menssion": "NOM_FAVORITE",
// 		"Adresse_restaurant": "Bonamousadi",
// 		"image_restaurant": "b089738f-6538-48c3-a09c-7f7ef513b97e.jpg",
// 		"createdAt": "2024-04-07T23:29:48.580Z",
// 		"updateAt": "2024-04-07T23:29:48.580Z",
// 		"adminId": null,
// 		"Plats": [],
// 		"Article": [],
// 		"Reservation": [],
// 		"Admin": null
// 	}
// ]
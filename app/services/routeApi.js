import apiService from "./Api";

// Requetes GET
export const fetchSomeRestaurant = () => {
    return apiService.get('/restaurants')
  }
  export const fetchSomePlats = () => {
    return apiService.get('/plats');
  };
  export const fetchSomeLots = () => {
    return apiService.get('/lots');
  };
  export const fetchSomeNotifications = () => {
    return apiService.get('/notifications')
  };
  export const getSomeCommande = (userId) => {
    return apiService.get(`/commandes/${userId}`)
  
  };
  
  // resquete POST :
  
  
  export const fetchSomeGeolocation = (latitude, longitude) => {
    return apiService.post('/geolocalisation', { latitude, longitude })
  };


  
  export const fetchSomeCommande = (cart, userId) => {
    const commande = cart.map(item => ({
      quantity: item.quantity,
      userId: userId, /* ID de l'utilisateur, à remplacer par la valeur réelle */
      platsId: item.id, 
      
    }));
        return apiService.post('/commande', { commande : commande})
  }

  export const fetchSomeAdressLivraison = (adresse) => {
    console.debug("Adresse de livraion: ", adresse);
    return apiService.post('/livraison', {adresse: adresse})
  }

  export const fetchSomeUser = (userData) => {
    return apiService.get('/user/signIn', {userData})
  }
  
  export const fetchSomePhone = (userData) => {
    console.debug("info user: ", userData);
    return apiService.post('/phone-otp', { userData: userData })
  }

  export const fetchSomeValidateOTP = (otpCode) => {
    return apiService.post('/verify-otp', {otpCode: otpCode})
  }
  
  export const fetchSomeGame = ({lotId, userId, selectedNumbers, isWinner}) => {
    return apiService.post('./games', {lotId, userId, selectedNumbers, isWinner})
  }
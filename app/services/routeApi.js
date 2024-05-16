import apiService from "./Api";

// Requetes GET
  export const getchSomeRestaurant = () => {
    return apiService.get('/restaurants')
  }
  export const getchSomeRepas = () => {
    return apiService.get('/plats');
  };
  export const getchSomeUser = () => {
    return apiService.get('/users')
  }
  export const getchSomeslide = () => {
    return apiService.get('/slides');
  };
  export const getchSomeGeolocation = () => {
    return apiService.get("/geolocalisations")
  }
  export const getchSomecategorie = () => {
    return apiService.get('/categories')
  };
  // export const getSomeCommande = (userId) => {
  //   return apiService.get(`/commandes/${userId}`)
  
  // };
  export const getSomeCommande = () => {
    return apiService.get("/commandes")
  };
  export const getchSomeLivraisons = () => {
    return apiService.get("/livraisons")
  };
  export const getchSomeVille = () => {
    return apiService.get("/villes")
  }
  
  // resquete POST :
  
  
  export const fetchSomeGeolocation = (geolocationData) => {
    return apiService.post('/geolocalisation', { geolocationData: geolocationData })
  };

  // const commande = cart.map(item => ({
  //   quantity: item.quantity,
  //   userId: userId, /* ID de l'utilisateur, à remplacer par la valeur réelle */
  //   platsId: item.id, 
    
  // }));
  
  export const addSomeCommande = (commande, userId) => {
      return apiService.post('/commande', { commande : commande, userId: userId})
  }

  // export const addSomeCommande = (cart) => {
  //   return apiService.post("/commande", {cart: cart})
  // }

  export const fetchSomeAdressLivraison = (adresse) => {
    console.debug("Adresse de livraion: ", adresse);
    return apiService.post('/livraison', {adresse: adresse})
  }

  export const fetchSomeUser = () => {
    return apiService.get('/users')
  }
  
  export const fetchSomePhone = ({username, phone}) => {
    return apiService.post('/phone-otp',{ username, phone })
  }

  export const fetchSomeValidateOTP = (otpCode) => {
    return apiService.post('/verify-otp', { code: otpCode })
  }
  
  export const fetchSomeGame = ({lotId, userId, selectedNumbers, isWinner}) => {
    return apiService.post('./games', {lotId, userId, selectedNumbers, isWinner})
  }
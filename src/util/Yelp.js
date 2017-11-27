const clientId = "vWxQvbuUVMMvn6zvfNxVZg";
const secret = "2m1s7wtW8VyPhjSJElC7I6T4Z4hZwVaxiKHfHpfDAm28fe5bM0FLxX2JQIWrDsho";
let accessToken = "";

const Yelp = {
	getAccessToken(){
		if (accessToken) {
			return new Promise( resolve => {resolve(accessToken);} );
		}
		return fetch(
			'https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id='
			+ clientId 
			+ '&client_secret='
			+ secret, { method: 'POST' }
			).then( response => response.json() ).then( jsonResponse => {accessToken = jsonResponse.access_token;} );
	},

	search(term, location, sortBy){
      return Yelp.getAccessToken().then( ()=> {
      	return fetch(
      		'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search' +
      		'?term=' + term +
      		'&location=' + location +
      		'&sort_by=' + sortBy,
      		{ headers: {Authorization: `Bearer ${accessToken}`} });
      }).then( response => response.json() ).then( jsonResponse => {
      	if (jsonResponse.businesses){
      		return jsonResponse.businesses.map( business => {
      			//console.log(business);
      			//return business;
      			return ({
      				id: business.id,
      				imageSrc: business.image_url,
					name: business.name,
					address: business.location.address1,
					city: business.location.city,
					state: business.location.state,
					zipCode: business.location.zip_code,
					category: business.categories[0].title,
					rating: business.rating,
					reviewCount: business.review_count,
					displayAddress: business.location.display_address,
					coordinates: business.coordinates
      			});
      		} );
      	}
      } );

	}
};

export { Yelp };
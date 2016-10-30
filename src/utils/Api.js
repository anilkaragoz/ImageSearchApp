const Api = {
  getImagesWithQuery(query, page) {
    const API_KEY = 'YOUR_API_KEY_GOES_HERE';
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&content_type=1&sort=interestingness-desc&format=json&nojsoncallback=1&text=${query.replace(' ', ',')}&page=${page}`;

    return (
      fetch(url)
        .then(res => {return res.json()})
          .then(res => {
            return res.photos.photo.map((elem) => {
              return {
                farm: elem.farm,
                server: elem.server,
                id: elem.id,
                secret: elem.secret,
                title: elem.title,
              }
            });
          })
          .catch(error => console.log(error))
    );
  },
};

export default Api;

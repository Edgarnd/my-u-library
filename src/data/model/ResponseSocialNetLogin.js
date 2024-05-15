class ResponseSocialNetLogin {
    constructor(socialId, socialNetwork, email, urlPicture, fullName) {
        this.socialId = socialId;
        this.socialNetwork = socialNetwork;
        this.email = email;
        this.urlPicture = urlPicture;
        this.fullName = fullName;
    }
}

export default ResponseSocialNetLogin;
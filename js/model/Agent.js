function Agent(){
    this._id
    this.name;
    this.type;
    this.desc;
    this.link;
    this.linkToBioAgent;
    this.instanceArray={};
    this.contact;
    this.credits;
    this.version;
    this.publications;

    this.construct = function (_id,name,type,desc,link,linkToBioAgent,instance,contact,credits,version,publications){
        this.setId(_id);
        this.setName(name);
        this.setType(type)
        this.setDesc(desc);
        this.setLink(link);
        this.setLinkToBioAgent(linkToBioAgent);
        this.setInstance(instance);
        this.setContact(contact);
        this.setCredits(credits);
        this.setVersion(version);
        this.setPublications(publications);
    }

    //Setters
    this.setId = function (_id) {this._id= _id;}
    this.setName = function (name) {this.name = name;}
    this.setType = function (type) {this.type = type;}
    this.setDesc = function (desc){this.desc = desc;}
    this.setLink = function (link){this.link = link;}
    this.setLinkToBioAgent = function (linkToBioAgent) {this.linkToBioAgent = linkToBioAgent;}
    this.setInstance = function (instance) {this.instanceArray[this.type] = instance}
    this.setContact = function (contact){this.contact = contact;}
    this.setCredits = function (credits) {this.credits = credits;}
    this.setVersion = function (version) {this.version = version;}
    this.setPublications = function (publications) {this.publications = publications;}


    //Getters
    this.getId = function () {return this._id;}
    this.getName = function () {return this.name;}
    this.getType = function () {return this.type;}
    this.getDesc = function () {return this.desc;}
    this.getLink = function () {return this.link;}
    this.getLinkToBioAgent = function () {return this.linkToBioAgent;}
    this.getInstance = function () {return this.instanceArray;}
    this.getContact = function () {return this.contact;}
    this.getCredits = function () {return this.credits;}
    this.getVersion = function () {return this.version;}
    this.getPublications =function () {return this.publications;}
}

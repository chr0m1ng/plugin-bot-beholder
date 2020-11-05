const NAME_SEPARATOR = '@';
const INSTANCE_SEPARATOR = '/';

class Node {
    constructor(identity) {
        const [name, domain_instance] = identity.split(NAME_SEPARATOR);
        const [domain, instance] = domain_instance.split(INSTANCE_SEPARATOR);
        this.name = encodeURIComponent(name);
        this.domain = domain;
        this.instance = instance;
    }

    toString() {
        return `${this.name}${NAME_SEPARATOR}${this.domain}`;
    }
}

export default Node;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const createInviteUrl = (id: number) => `${SERVER_URL}/invite/human${id}`;

export default createInviteUrl;

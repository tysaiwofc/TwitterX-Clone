const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

function createDefaultUsers({ ip_address, data }) {
    return Promise.all(data.map(async (userData, i) => {

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        await prisma.cl_users.create({
            data: {
                username: userData.username,
                fname: userData.fname,
                password: hashedPassword,
                email: `${i}${userData.email}`,
                ip_address: ip_address,
                avatar: userData.avatar,
                admin: 1,
                verified: 1
            },
        });
    }));
}

function getPublicIP() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}

const defaultUsers = [
    {
        username: "X",
        fname: "X",
        password: "123456789",
        email: "123456789@x.com",
        avatar: "/images/xcorp.jpg",
    },
    {
        username: "premium",
        fname: "Premium",
        password: "123456789",
        email: "123456789@x.com",
        avatar: "/images/xcorp.jpg",
    },
];

getPublicIP()
    .then((ip) => {
        return createDefaultUsers({ ip_address: ip, data: defaultUsers });
    })
    .then(() => console.log("✅ Default Users Are Created"))
    .catch((error) => console.error("❌ DEFAULT_USERS_CREATE_ERROR ", error))
    .finally(async () => {
        await prisma.$disconnect();
    });

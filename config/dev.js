'use strict';
/**
 * CONFIG --- DEVELOPMENT
 */
module.exports = {
    // Enable logging
    logging: {
        dir: './logs',
        level: 'verbose',
        datePattern: 'yyyy-MM-dd'
    },
    // Server config - For non-development environments, set this in the Environment Variables
    server: {
        enableHTTP: true,
        http: {
            name: 'Frontmen Boilerplate HTTP-Server',
            port: 3000,
        },
        enableHTTPS: false,
        https: {
            name: 'Frontmen Boilerplate HTTPS-Server',
            port: 8443,
            fullchainPath: './certs/fullchain.pem',
            privatekeyPath: './certs/privatekey.pem'
        }
    },
    // Database - For non-development environments, set this in the Environment Variables
    database: {
        username: 'root',
        password: 'password',
        database: 'frontmen_boilerplate_v1',
        host: '127.0.0.1',
        port: '3306',
        dialect: 'mysql',
        logging: false, // Enable/ Disable console logging,
        operatorsAliases: false, // use Symbol based operators for better security
        pw_salt_factor: 12
    },
    // Admin user - For non-development environments, set this in the Environment Variables
    admin: {
        firstname: 'Frontmen',
        lastname: 'Eindhoven',
        username: 'admin',
        password: 'admin',
        email: 'niek.heezemans@frontmen.nl',
        status: 'active',
        role_id: 2, // Administrator
        branch_id: 3 // Frontmen - Eindhoven
    },
    // Cache settings
    caching: {
        store: 'memory',
        max: 100,
        ttl: (60*60*24),
    },
    // JWT Settings - For non-development environments, set this in the Environment Variables
    jwt: {
        secret: '22qdwjuvydq7632123rfqp@zD-_Vwkw(3ZyAAwef565iuh)VmCixyf4VTd',
        token_expiration: 90, // in Minutes
    }
}
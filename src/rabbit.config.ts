import { Transport, ClientsModuleOptions } from '@nestjs/microservices';

const url = 'amqp://admin:admin@localhost:5672'

export const rabbitMQConfig: ClientsModuleOptions = [{
    name: 'VIDEO_SERVICE',
    transport: Transport.RMQ,
    options: {
        urls: [url],  // Update with your RabbitMQ server URL
        queue: 'video-maker-queue-anime',
        queueOptions: {
            durable: true
        },
    },
}, {
    name: 'EMAIL_SERVICE',
    transport: Transport.RMQ,
    options: {
        urls: [url], // Update with your RabbitMQ server URL
        queue: 'email-nagano-queue',
        queueOptions: {
            durable: true,
        },
    },
},];

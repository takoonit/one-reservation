const kafka = require("kafka-node");

let producer;

const initialize = () => {
	const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
	producer = new kafka.Producer(client);

	producer.on("ready", () => {
		console.log("Kafka Producer is connected and ready.");
	});

	producer.on("error", (err) => {
		console.error("Error in Kafka Producer", err);
	});
};

const sendEvent = (topic, message) => {
	const payloads = [{ topic, messages: JSON.stringify(message) }];
	producer.send(payloads, (err, data) => {
		if (err) console.error("Kafka Send Error:", err);
		else console.log("Kafka Send Success:", data);
	});
};

module.exports = {
	initialize,
	sendEvent,
};

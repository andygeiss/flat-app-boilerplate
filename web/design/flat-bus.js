// Register a global variable for flat.
const flat = {};

// Bus implements a basic event bus, which is able to send message across frames.
flat.Bus = new class {
    constructor() {
        this.topics = [];
    }

    // init registers an event listener.
    init() {
        let self = this;
        window.addEventListener("message", (evt) => {
            let content = evt.data.content;
            let topic = evt.data.topic;
            // run commands for a specific topic.
            self.topics.forEach((t) => {
                if (t === topic.name) {
                    topic.commands.forEach((command) => {
                        command(content);
                    });
                }
            });
        });
    }

    // publish sends a message in context of a specific topic to our event handler.
    publish(topic, message) {
        window.postMessage({topic: topic, content: message}, "*");
    }

    // subscribes a new command in context of a specific topic.
    subscribe(topic, command) {
        let self = this;
        // initialize the topic registry if needed.
        if (self.topics.length === 0) {
            self.topics = [
                {name: topic, commands: []}
            ];
        }
        // add command if topic matched.
        let exists = false;
        self.topics.forEach((t, i) => {
            if (t.name === topic) {
                // then add a new command.
                self.topics[i].commands.push(command);
                exists = true;
            }
        });
        // or create a new topic -> commands mapping.
        if (!exists) {
            let t = {name: topic, commands: [command]};
            self.topics.push(t);
        }
    }
};

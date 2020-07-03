flat.Bus = new class {
    constructor() {
        this.topics = [];
    }

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

    publish(topic, message) {
        // send a content which can be received by our event handler.
        window.postMessage({topic: topic, content: message}, "*");
    }

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

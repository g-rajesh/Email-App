const Imap = require("imap");
const { simpleParser } = require("mailparser");

const fetchEmails = () => {
  const imapConfig = {
    user: "batmanae2@gmail.com",
    password: "GCPD**jokes123",
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { servername: "imap.gmail.com" },
  };

  const imap = new Imap(imapConfig);
  const inbox = [];

  const searchCallBack = (err, results) => {
    const f = imap.fetch(results, { bodies: "" });

    f.on("message", (msg) => {
      msg.on("body", (stream) => {
        simpleParser(stream, async (err, parsed) => {
          const { from, subject, text } = parsed;
          inbox.push({ from, subject, text });
        });
      });
    });

    f.once("error", (ex) => {
      return Promise.reject(ex);
    });

    f.once("end", () => {
      console.log("Done fetching all messages!");
      isFetchComplete = true;
      imap.end();
    });
  };

  const openBoxCallback = () => {
    imap.search(["ALL", ["SINCE", new Date()]], searchCallBack);
  };

  const onceCallback = () => {
    imap.openBox("INBOX", false, openBoxCallback);
  };

    try {
      imap.once("ready", onceCallback);

      imap.once("error", (err) => {
        console.log(err);
      });

      imap.once("end", () => {
        console.log("Connection ended");
        console.log(inbox);

      });

      imap.connect();
    } catch (err) {
      console.log(err);
      console.log("An error occurred");
    }

};
fetchEmails();

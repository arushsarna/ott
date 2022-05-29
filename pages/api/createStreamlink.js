import streamlink from "../../models/streamlink";
import dbConnect from "./db";
import content from "../../models/content";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
export default async function createStreamlink(req, res) {
  await dbConnect();

  const { title, type, episode, link } = req.body;
  //   content.find({ phoneno }, (error, data) => {
  //     if (error) {
  //       res.json(error);
  //     } else {
  //       if (data.length == 0) {
  //         user.create({ phoneno });
  //       }
  //     }
  //   });
  try {
    content.find({ title }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        if (data.length == 0) {
          console.log("No id found");
          res.status(400).json({ err: "No id found" });
        } else {
          console.log(data[0].id);
          let newStreamlink = {};
          async function create() {
            newStreamlink = await streamlink.create({
              id: data[0].id,
              type: type,
              episode: episode,
              link: link,
            });
            console.log(newStreamlink);
            res.status(200).json(newStreamlink);
          }
          create();
        }
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

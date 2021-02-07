import dbConnect from "../../../utils/dbConnect";
import Image from "../../../models/Image";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const item = await Image.find({_id: id});

        if (!item) {
          return res.status(400).json({ success: false, data: [] });
        }

        res.status(200).json({ success: true, data: item });
      } catch (e) {
        res.status(400).json({ success: false, data: [] });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

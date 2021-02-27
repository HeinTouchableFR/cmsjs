import db from "../../../utils/dbConnect";

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const snapshot = await db.doc(`images/${id}`).get()
        const item = {
          _id: snapshot.id,
          ...snapshot.data()
        }

        if (!item) {
          return res.status(400).json({ success: false });
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

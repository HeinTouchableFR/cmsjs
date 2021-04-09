const { exec } = require('child_process');

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                exec('vercel', (err, stdout, stderr) => {
                    if (err) {
                        res.status(200).json({ success: true, data: {stderr, stdout} })
                    }

                    // the *entire* stdout and stderr (buffered)
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                    res.status(200).json({ success: true, data: {stderr, stdout} })
                });

            } catch (e) {
                res.status(400).json({ success: false, errors: e });
            }
            break;
        default:
            res.status(400).json({ success: false, errors: "Cette méthode n'est pas disponible" });
            break;
    }
};

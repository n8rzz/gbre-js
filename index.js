const { exec  } = require('child_process');

exec('git branch', (err, stdout, stderr) => {
    if (err) {
        return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});

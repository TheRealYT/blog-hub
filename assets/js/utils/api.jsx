async function api(url, body) {
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const {data, message, success} = await response.json();

            if (response.ok && success) {
                res({message, data})
            } else {
                rej({message, error: data.error})
            }
        } catch (err) {
            rej({message: 'Something went wrong', error: 'Something went wrong'})
        }
    })
}

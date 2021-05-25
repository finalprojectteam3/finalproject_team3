from flask import Flask, render_template, redirect, Response

# Create an instance of Flask
app = Flask(__name__)

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    return render_template("index.html")


# Route that will trigger the capture function
@app.route("/capture")
def capture():

    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)


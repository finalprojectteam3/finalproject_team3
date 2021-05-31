from flask import Flask, render_template, redirect

# Create an instance of Flask
app = Flask(__name__)

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    return render_template("index.html")

@app.route("/about")
def about():

    return render_template("about.html" )


if __name__ == "__main__":
    app.run(debug=True)


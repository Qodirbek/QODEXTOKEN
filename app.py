from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Sessiyalar uchun kalit

# Foydalanuvchi ma'lumotlarini vaqtincha saqlash
users = {}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def login():
    user_id = request.args.get("id")
    username = request.args.get("username")

    if user_id and username:
        session["user_id"] = user_id
        session["username"] = username
        users[user_id] = {"username": username, "balance": 0, "wallet": None}
    
    return redirect(url_for("dashboard"))

@app.route("/dashboard")
def dashboard():
    if "user_id" not in session:
        return redirect(url_for("index"))
    
    user_id = session["user_id"]
    return render_template("dashboard.html", user=users[user_id])

@app.route("/api/users", methods=["GET"])
def get_users():
    return jsonify(users)

@app.route("/admin")
def admin():
    return render_template("admin.html", users=users)

if __name__ == "__main__":
    app.run(debug=True)
    
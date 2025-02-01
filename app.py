from flask import Flask, render_template, redirect, url_for, request, session
import random

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Session uchun maxfiy kalit

@app.route('/')
def home():
    user_data = session.get('user_data', None)
    if user_data:
        coins = user_data["coins"]
        username = user_data["username"]
        profile_pic = user_data["profile_pic"]
        return render_template("index.html", coins=coins, username=username, profile_pic=profile_pic, page="home")
    return redirect(url_for('login'))

@app.route('/login/<username>/<profile_pic>', methods=['GET'])
def login(username, profile_pic):
    session['user_data'] = {
        'username': username,
        'profile_pic': profile_pic,
        'coins': 0  # Boshlang‘ich tangalar soni
    }
    return redirect(url_for('home'))

@app.route('/click_coin', methods=['POST'])
def click_coin():
    user_data = session.get('user_data', None)
    if user_data:
        user_data["coins"] += 1
    return redirect(url_for('home'))

@app.route('/earn')
def earn():
    user_data = session.get('user_data', None)
    if user_data:
        return render_template("index.html", coins=user_data["coins"], username=user_data["username"], profile_pic=user_data["profile_pic"], page="earn")
    return redirect(url_for('login'))

@app.route('/upgrade')
def upgrade():
    user_data = session.get('user_data', None)
    if user_data:
        return render_template("index.html", coins=user_data["coins"], username=user_data["username"], profile_pic=user_data["profile_pic"], page="upgrade")
    return redirect(url_for('login'))

@app.route('/wallet')
def wallet():
    user_data = session.get('user_data', None)
    if user_data:
        return render_template("index.html", coins=user_data["coins"], username=user_data["username"], profile_pic=user_data["profile_pic"], page="wallet")
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True)
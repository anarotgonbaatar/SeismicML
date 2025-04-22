from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas
import numpy
from datetime import datetime

# Load trained model
model = pickle.load( open('models/random_forest.model', 'rb') )

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
	data = request.json
	print("Incoming data:", data )

	try:
		# Extract values
		lat = float( data['latitude'] )
		lon = float( data['longitude'] )
		date = datetime.strptime( data['date'], '%Y-%m-%d' )
		year, month, day = date.year, date.month, date.day
		hour = 12	# Default for now

		# Input dataframe
		input_df = pandas.DataFrame([{
			'latitude': lat,
			'longitude': lon,
			'year': year,
			'month': month,
			'day': day,
			'hour': hour,
			'nst': 20,
			'gap': 100,
			'dmin': 0.5,
			'rms': 0.5,
			'horizontalError': 0.5,
			'depthError': 0.5,
			'magNst': 10,
		}])

		# Get predictions from all trees
		all_predictions = [ estimator.predict( input_df )[ 0 ] for estimator in model.estimators_ ]
		prediction = float( sum ( all_predictions ) / len( all_predictions ) )

		# Get standard deviation
		std_dev = numpy.std( all_predictions )

		# Convert standard deviation to confidence score
		# Lower std_dev == higher confidence score
		confidence_score = max( 0, min( 100, ( 100 - std_dev / prediction * 100 )))
		confidence_score = round( confidence_score, 1 )

		return jsonify({
			"magnitude": round( float( prediction ), 2 ),
			"confidence": f"{ confidence_score }%"
		})
	
	except Exception as e:
		return jsonify({
			"error": str( e )
		}), 400
	
if __name__ == '__main__':
	app.run( debug = True )
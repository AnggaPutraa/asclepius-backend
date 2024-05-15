import * as tf from '@tensorflow/tfjs-node';
import { v4 as uuidv4 } from 'uuid';
import { conf } from '../../conf';

class PredictService {
  private model: tf.GraphModel | undefined;

  async predict(image: Buffer) {
    await this.loadModel();

    const tensor = this.preprocessImage(image);
    const prediction = this.model!.predict(tensor) as tf.Tensor;

    const id = uuidv4();
    const confidenceScore = await this.calculateConfidenceScore(prediction);
    const label = this.getLabelFromScore(confidenceScore);
    const suggestion = this.getSuggestionFromLabel(label);
    const createdAt = new Date();
    const result = {
      id: id,
      result: label,
      suggestion: suggestion,
      createdAt: createdAt.toISOString(),
    };

    return result;
  }

  private async loadModel() {
    if (!this.model) {
      this.model = await tf.loadGraphModel(conf.modelUrl);
    }
  }

  private preprocessImage(image: Buffer) {
    return tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();
  }

  private async calculateConfidenceScore(prediction: tf.Tensor) {
    const score = await prediction.data();
    return Math.max(...score) * 100;
  }

  private getLabelFromScore(confidenceScore: number) {
    return confidenceScore > 50 ? 'Cancer' : 'Non-cancer';
  }

  private getSuggestionFromLabel(label: string) {
    return label === 'Cancer'
      ? 'Segera periksa ke dokter!'
      : 'Anda tidak terkena kanker!';
  }
}

export default new PredictService();

module.exports = {
  AudioPlayer: {
    Request: {
      PlaybackFailed: 'AudioPlayer.PlaybackFailed',
      PlaybackFinished: 'AudioPlayer.PlaybackFinished',
      PlaybackNearlyFinished: 'AudioPlayer.PlaybackNearlyFinished',
      PlaybackStarted: 'AudioPlayer.PlaybackStarted',
      PlaybackStopped: 'AudioPlayer.PlaybackStopped'
    },
    Directive: {
      ClearQueue: 'AudioPlayer.ClearQueue',
      Play: 'AudioPlayer.Play',
      Stop: 'AudioPlayer.Stop'
    },
    PlayBehavior: {
      Enqueue: 'ENQUEUE',
      ReplaceAll: 'REPLACE_ALL',
      ReplaceEnqueued: 'REPLACE_ENQUEUED'
    },
    ClearBehavior: {
      ClearAll: 'CLEAR_ALL',
      ClearEnqueued: 'CLEAR_ENQUEUED'
    }
  },
  CardType: {
    LinkAccount: 'LinkAccount',
    Simple: 'Simple',
    Standard: 'Standard'
  },
  ConnectedHome: {
    Control: 'Alexa.ConnectedHome.Control',
    Discovery: 'Alexa.ConnectedHome.Discovery',
    System: 'Alexa.ConnectedHome.System',
    Request: {
      DecrementPercentage: 'DecrementPercentageRequest',
      DecrementTargetTemperature: 'DecrementTargetTemperatureRequest',
      DiscoverAppliances: 'DiscoverAppliancesRequest',
      HealthCheck: 'HealthCheckRequest',
      IncrementPercentage: 'IncrementPercentageRequest',
      IncrementTargetTemperature: 'IncrementTargetTemperatureRequest',
      SetPercentage: 'SetPercentageRequest',
      SetTargetTemperature: 'SetTargetTemperatureRequest',
      TurnOff: 'TurnOffRequest',
      TurnOn: 'TurnOnRequest'
    },
    Response: {
      DiscoverAppliances: 'DiscoverAppliancesResponse',
      HealthCheck: 'HealthCheckResponse'
    },
    Confirmation: {
      DecrementPercentage: 'DecrementPercentageConfirmation',
      DecrementTargetTemperature: 'DecrementTargetTemperatureConfirmation',
      IncrementPercentage: 'IncrementPercentageConfirmation',
      IncrementTargetTemperature: 'IncrementTargetTemperatureConfirmation',
      SetPercentage: 'SetPercentageConfirmation',
      SetTargetTemperature: 'SetTargetTemperatureConfirmation',
      TurnOff: 'TurnOffConfirmation',
      TurnOn: 'TurnOnConfirmation'
    }
  },
  Intent: {
    Cancel: 'AMAZON.CancelIntent',
    Help: 'AMAZON.HelpIntent',
    LoopOff: 'AMAZON.LoopOffIntent',
    LoopOn: 'AMAZON.LoopOnIntent',
    Next: 'AMAZON.NextIntent',
    No: 'AMAZON.NoIntent',
    Pause: 'AMAZON.PauseIntent',
    Previous: 'AMAZON.PreviousIntent',
    Repeat: 'AMAZON.RepeatIntent',
    Resume: 'AMAZON.ResumeIntent',
    ShuffleOff: 'AMAZON.ShuffleOffIntent',
    ShuffleOn: 'AMAZON.ShuffleOnIntent',
    StartOver: 'AMAZON.StartOverIntent',
    Stop: 'AMAZON.StopIntent',
    Yes: 'AMAZON.YesIntent'
  },
  PlaybackController: {
    Request: {
      NextCommandIssued: 'PlaybackController.NextCommandIssued',
      PauseCommandIssued: 'PlaybackController.PauseCommandIssued',
      PlayCommandIssued: 'PlaybackController.PlayCommandIssued',
      PreviousCommandIssued: 'PlaybackController.PreviousCommandIssued'
    }
  },
  Request: {
    ExceptionEncountered: 'System.ExceptionEncountered',
    Intent: 'IntentRequest',
    Launch: 'LaunchRequest',
    SessionEnded: 'SessionEndedRequest'
  },
  SpeechType: {
    PlainText: 'PlainText',
    SSML: 'SSML'
  }
}

import { useAgent } from '@credo-ts/react-hooks'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { useEffect } from 'react'
import { AppState } from 'react-native'

import { ConsoleLogger } from '../../services/logger'
import { RootStackParams, Screens } from '../../types/navigators'
import { connectFromScanOrDeepLink } from '../../utils/helpers'

const logger = new ConsoleLogger()

const NFCHandler: React.FC = () => {
  const { agent } = useAgent()
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

  const handleConnectToInvitation = async () => {
    if (!agent) {
      logger.error('Agent is not initialized')
      return
    }

    try {
      // Use the hardcoded link for now
      const hardcodedLink =
        'http://crms.digicred.services:8030?c_i=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMC9pbnZpdGF0aW9uIiwgIkBpZCI6ICIyZGMxZGNiNy1hZTYzLTQ1YWMtYmE0NS0zODY0M2ZiODJmODAiLCAibGFiZWwiOiAiQ2FwZSBGZWFyIiwgInJlY2lwaWVudEtleXMiOiBbIjZuSDU2d24yaGFzb2pHSG9zQ0gyUzNLeGp3NEVjNzExNENKUmNycUM0UDlUIl0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2NybXMuZGlnaWNyZWQuc2VydmljZXM6ODAzMCIsICJpbWFnZVVybCI6ICJodHRwczovL2NmY2MuYWNhZGVtaWN3b3Jrcy5jb20vaW1hZ2VfdXBsb2Fkcy9XMXNpWmlJc0ltbHRZV2RsWDNWd2JHOWhaSE12TVM5bE5URTBaakkyTlMxbU56ZG1MVFJrTVRNdFlUUXhOUzA0TTJObE1tTmpPV1F5TWpZdlkyWmpZeTV3Ym1jaVhWMD9zaGE9MTE4YWU4ZjU1MWY4YzJjMSJ9'

      const parsedInvitation = await agent.oob.parseInvitation(hardcodedLink)
      const invitationId = parsedInvitation.id

      const existingOutOfBandRecord = await agent.oob.findByReceivedInvitationId(invitationId)
      if (existingOutOfBandRecord) {
        const existingConnections = await agent.connections.findAllByOutOfBandId(existingOutOfBandRecord.id)

        if (existingConnections && existingConnections.length > 0) {
          const existingConnection = existingConnections[0]
          navigation.reset({
            index: 0,
            routes: [
              {
                name: Screens.Chat,
                params: { connectionId: existingConnection.id },
              },
            ],
          })
          return
        }
      }

      // If no existing connection, create a new one
      const { connectionRecord, outOfBandRecord } = await connectFromScanOrDeepLink(
        hardcodedLink,
        agent,
        logger,
        navigation,
        false,
        false,
        true
      )

      if (connectionRecord?.id) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: Screens.Chat,
              params: { connectionId: connectionRecord.id },
            },
          ],
        })
      } else if (outOfBandRecord?.id) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: Screens.Chat,
              params: { outOfBandRecordId: outOfBandRecord.id },
            },
          ],
        })
      } else {
        logger.error('Neither connectionId nor outOfBandRecordId found')
      }
    } catch (error) {
      logger.error('Error processing the invitation:', error as object)
    }
  }

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        // App has come to the foreground, possibly due to NFC
        handleConnectToInvitation()
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [agent, navigation])

  return null
}

export default NFCHandler

using UnityEngine;

public enum Dir
{

    North,
    South,
    East,
    West

}

public class Channel : MonoBehaviour
{

    public Dir direction;

    public float gridOffset;

    public float rotation()
    {
        if (direction == Dir.North)
        {
            return 0;
        }
        else if (direction == Dir.South)
        {
            return 180;
        }
        else if (direction == Dir.East)
        {
            return 270;
        }
        else
        {
            return 90;
        }

    }

    void Start()
    {
        if(direction == Dir.East || direction == Dir.West)
        {
            // gridOffset = y comp
            transform.localPosition = new Vector3(transform.localPosition.x, transform.localPosition.y, gridOffset);
        } else
        {
            // gridOffset = x comp
            transform.localPosition = new Vector3(gridOffset, transform.localPosition.y, transform.localPosition.z);
        }
    }

    void Update()
    {

    }
}
